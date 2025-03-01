import Books from "../models/bookModel.js";

export const newBook = async (req, res) => {
  try {
    const newBook = new Books({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      url: req.body.url,
      desc: req.body.desc,
      language: req.body.language,
    });
    await newBook.save();
    return res.status(201).json({ message: "New book created succesfully" });
  } catch (error) {
    console.log("Error in creating a new book", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findByIdAndUpdate(
      bookId,
      {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        url: req.body.url,
        desc: req.body.desc,
        language: req.body.language,
      },
      {
        new: true,
      }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log("Error in updating book", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findByIdAndDelete(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted succesfully" });
  } catch (error) {
    console.log("Error in deleting the book", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });
    return res.status(200).json({ books });
  } catch (error) {
    console.log("Error in getting info of all books", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentBooks = async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({ books });
  } catch (error) {
    console.log("Error in getting info of all books", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ book });
  } catch (error) {
    console.log("Error in finding book", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
