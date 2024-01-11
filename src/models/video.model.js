import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = mongoose.Schema(
    {
        videoFile: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        }, 

        duration: {
            type: Number,
            required: true
        },

        views: {
            type: Number,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

    }, 

    { 
        timestamps: true 
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)