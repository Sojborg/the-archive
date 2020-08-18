import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "../../helpers/navigation";

interface IBook {
  id: string;
  title: string;
  author: string;
}

const bookInfo = {
  coverImageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/51JM3rldZCL._SX329_BO1,204,203,200_.jpg",
  productId: "0525509283",
  pageCount: 320,
  publisher: "One World",
  synopsis:
    "Antiracism is a transformative concept that reorients and reenergizes the conversation about racism—and, even more fundamentally, points us toward liberating new ways of thinking about ourselves and each other. At it's core, racism is a powerful system that creates false hierarchies of human value; its warped logic extends beyond race, from the way we regard people of different ethnicities or skin colors to the way we treat people of different sexes, gender identities, and body types. Racism intersects with class and culture and geography and even changes the way we see and value ourselves. In How to Be an Antiracist, Kendi takes readers through a widening circle of antiracist ideas—from the most basic concepts to visionary possibilites—that will help readers see all forms of racism clearly, understand their posionous consequences, and work to oppose them in our systems and in ourselves.\n\nKendi weaves an electrifying combination of ethics, history, law, and science with his own personal story of awakening to antiracism. This is an essential work for anyone who wants to go beyond the awareness of racism to the next step: contributing to the formation of a just and equitable society.",
};

export const CreateBook = () => {
  const history = useHistory();  
  const [book, setBook] = useState({
    title: "",
    author: "",
  } as IBook);

  const onChange = (name: keyof IBook, value: string) => {
    let editedBook = { ...book, ...bookInfo };
    editedBook[name] = value;
    console.log(editedBook);
    setBook(editedBook);
  };

  const save = async () => {
    try {
      await fetch("/savebook", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(book),
      });

      history.push(Navigation.books);
    } catch(e) {

    }
  };

  return (
    <div>
      <h2>New book</h2>
      <div>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type={"text"}
          value={book.id}
          onChange={(e) => onChange("id", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id={"title"}
          type={"text"}
          value={book.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id={"author"}
          type={"text"}
          value={book.author}
          onChange={(e) => onChange("author", e.target.value)}
        />
      </div>
      <button type={"button"} onClick={save}>
        Save
      </button>
    </div>
  );
};
