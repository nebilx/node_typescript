// contain interface of our model
import { Document } from 'mongoose';

interface Post extends Document {
    title: string;
    body: string;
}

export default Post;
