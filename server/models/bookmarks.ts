import mongoose ,{ Document, Schema } from 'mongoose';

export interface IBookmarks {
    userId : string;
    bookmarks : string[];
}

const bookmarksSchema = new mongoose.Schema({
userId : { type: Schema.Types.String, unique: true},
bookmarks: [{  type: Schema.Types.String}]
})
    

const BookMarks = mongoose.model("BookMarks", bookmarksSchema)

export default BookMarks;