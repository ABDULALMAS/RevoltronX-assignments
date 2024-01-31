import mongoose, { Schema } from "mongoose";

export interface IHighlights{
    userId: string;
    tagId: string;
    highlights: string[];
    scrollPosition: number;
    notes: {
        createdAt: Date;
        title: string;
        content: string;
    }[];
}

const highlightsSchema = new mongoose.Schema({
    userId: { type: Schema.Types.String, unique: true},
    tagId: { type: Schema.Types.String, unique: true},
    highlights: [{type: Schema.Types.String}],
    scrollPosition: { type: Schema.Types.Number},
    notes: [
        {
            createdAt: { type: Schema.Types.Date, default: Date.now },
            title: { type: Schema.Types.String },
            content: { type: Schema.Types.String },
        },
    ],

    
})

const HighlightsModel = mongoose.model("HighlightsModel", highlightsSchema)

export default HighlightsModel;