// 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfigs";

//   

export const getUserProfile = createAsyncThunk(
	'user/getUserProfile',
	async (body, thunkAPI) => {
		try {
			thunkAPI.dispatch(setLoading(true));

			const response = await axiosClient.post(
				'/user/getUserProfile',
				body
			);
			console.log('user profile data fetched', response.result);
			return response.result;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			thunkAPI.dispatch(setLoading(false));
		}
	}
);

export const likeAndUnlike = createAsyncThunk(
	'/post/like',
	async (body, thunkAPI)=>{
		try {
			thunkAPI.dispatch(setLoading(true))

			const response = await axiosClient.post('/post/like', body)
			return response.result?.post;
		} catch (err) {
			throw Promise.reject(err)
			
		} finally{
			thunkAPI.dispatch(setLoading(false))
		}
	}
)

const postsSlice = createSlice({
	name: 'postsSlice',
	initialState: {
		userProfile: {},
	},

	extraReducers: (builder) => {
		builder.addCase(getUserProfile.fulfilled, (state, action) => {
			state.userProfile = action.payload;
		}).addCase(likeAndUnlike.fulfilled, (state, action)=>{
			const post = action.payload;
			console.log("liked", post);

			const index = state.userProfile?.posts?.findIndex((item)=> item._id === post._id)
			if(index !== -1){
				state.userProfile.posts[index] = post
			}
		})
	},
});

export default postsSlice.reducer;