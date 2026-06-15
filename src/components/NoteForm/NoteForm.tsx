import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { createNote } from "../../services/noteService";
import { error, success } from "../Message/Message";
import type { NewNote, NoteTag } from "../../types/note"; 

import css from "./NoteForm.module.css";

const validationSchema = Yup.object().shape({
  
  title: Yup.string()
    .required("Title is required")
    .min(3, "must be at least 3 characters long")
    .max(50, "Title is too long"),

  content: Yup.string().max(500, "Content is too long"),

  tag: Yup.string<NoteTag>() 
    .required("Tag is required"), 
});

const defaultValues: NewNote = {
  
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteFormProps {
  closeModal: () => void;
}

export default function NoteForm({ closeModal }: NoteFormProps) {
  const uniqueId = useId(); 
  const client = useQueryClient(); 

  const createNoteMutation = useMutation({
    
    mutationFn: createNote, 

    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["notes"] }); 
      success("A note has been created!");
      closeModal();
    },

    onError: error,
  });

  const submitForm = (formValues: NewNote) => {
    
    createNoteMutation.mutate(formValues);
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${uniqueId}-title`}>Title</label>

          <Field
            name="title"
            type="text"
            id={`${uniqueId}-title`}
            className={css.input}
          />

          <ErrorMessage name="title">
            {(errorText) => (
              
              <span className={css.error}>{errorText}</span>
            )}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${uniqueId}-content`}>Content</label>

          <Field
            as="textarea"
            name="content"
            id={`${uniqueId}-content`}
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage name="content">
            {(errorText) => (
              
              <span className={css.error}>{errorText}</span>
            )}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${uniqueId}-tag`}>Tag</label>

          <Field
            as="select"
            name="tag"
            id={`${uniqueId}-tag`}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage name="tag">
            {(errorText) => (
              
              <span className={css.error}>{errorText}</span>
            )}
          </ErrorMessage>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={closeModal}
            className={css.cancelButton}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending} 
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}