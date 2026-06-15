import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "../../services/noteService";

import SearchBox from "../SearchBox/SearchBox"
import Paginate from "../Pagination/ReactPagination"
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal//Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";

import css from "./App.module.css";

function App() {
  
  const [currentPage, setCurrentPage] = useState(1);


  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const showModal = () => setIsModalVisible(true); 
  const hideModal = () => setIsModalVisible(false); 

  const {
    data: notesData, 
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", searchQuery, currentPage], 
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const pagesCount = notesData?.totalPages ?? 0; 

  const handleSearch = useDebouncedCallback((searchText: string) => {
    
    setSearchQuery(searchText);
    setCurrentPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />

        {isSuccess && pagesCount > 1 && (
          <Paginate
            pageCount={pagesCount}
            forcePage={currentPage - 1}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          type="button" 
          className={css.button}
          onClick={showModal}
        >
          Create note +
        </button>

        {isModalVisible && (
          <Modal onClose={hideModal}>
            <NoteForm closeModal={hideModal} />
          </Modal>
        )}
      </header>

      {isError && (
        <p style={{ color: "#f61515" }}>
          Somthing went wrong!Please reload your page
        </p>
      )}

      {isLoading && <Loader />}

      {notesData && notesData.notes.length > 0 && (
        <NoteList notes={notesData.notes} />
      )}
    </div>
  );
}

export default App;
