const Database = require("./Database")
const Author = require("./entities/Author")
const Book = require("./entities/Book")
const Order = require("./entities/Order")
const Poster = require("./entities/Poster")
const User = require("./entities/User")

class App {
  static #database = new Database()

  createUser(name, email, password) {
    const user = new User(name, email, password)
    App.#database.saveUser(user)
  }

  getUsers() {
    return App.#database.find('users')
  }

  createAuthors(name, nationality, bio) {
    const author = new Author(name, nationality, bio)
    App.#database.saveAuthor(author)
  }

  getAuthors() {
    return App.#database.find('authors')
  }

  createBook(title, synopsis, genre, pages, author, description, price, inStock) {
    const book = new Book(title, synopsis, genre, pages, author, description, price, inStock)
    App.#database.saveBook(book)
  }

  addBook(bookname, quantity) {
    App.#database.addBooksToStock(bookname, quantity)
  }

  getBooks() {
    return App.#database.find('books')
  }

  //

  createPoster(name, description, height, width, price, inStock) {
    const poster = new Poster(name, description, height, width, price, inStock)
    App.#database.savePoster(poster)
  }

  addPoster(postername, quantity) {
    App.#database.addPostersToStock(postername, quantity)
  }

  getPosters() {
    return App.#database.find('posters')
  }

  //

  createOrder(items, user) {
    const order = new Order(items, user)
    App.#database.saveOrder(order)

    order.data.items.forEach(({ product, quantity }) => {
      if (product instanceof Book) {
        App.#database.removeBooksFroomStock(product.name, quantity)
      } else if (product instanceof Poster) {
        App.#database.removepostersFroomStock(product.name, quantity)
      }
    });
  }

  getOrders() {
    App.#database.find('orders')
  }

  showDatabase() {
    App.#database.showStorage()
  }
}


module.exports = App