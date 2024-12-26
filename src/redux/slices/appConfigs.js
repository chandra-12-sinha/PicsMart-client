import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from '../../Utils/axiosClient';
// import { axiosClient } from '../../utils/axiosClient';

export const getMyInfo = createAsyncThunk(
	'/user/getMyInfo',
	async (_body, thunkAPI) => {
		try {
			thunkAPI.dispatch(setLoading(true));

			const response = await axiosClient.get('/user/getMyInfo');

			console.log(response.result);
			
			return response.result;
		} catch (err) {
			throw Promise.reject(err);
		} finally {
			thunkAPI.dispatch(setLoading(false));
		}
	}
);

export const updateMyProfile = createAsyncThunk(
	'/user/update/MyProfile',
	async (body, thunkAPI) => {
		try {
			thunkAPI.dispatch(setLoading(true));

			const response = await axiosClient.put('/user/', body);

			console.log("updated with -",response.result);
			return response.result;
		} catch (err) {
			return Promise.reject(err);
		} finally {
			thunkAPI.dispatch(setLoading(false));
		}
	}
);

const appConfigSlice = createSlice({
	name: 'appConfigSlice',

	initialState: {
		isLoading: false,
		myProfile: {},
	},

	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(getMyInfo.fulfilled, (state, action) => {
			state.myProfile = action.payload?.user;
		}).addCase(updateMyProfile.fulfilled, (state, action) => {
			state.myProfile = action.payload?.user;
		});
	},
});

export default appConfigSlice.reducer;

export const { setLoading } = appConfigSlice.actions;
