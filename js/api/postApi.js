import axiosClient from './axiosClient';

const postApi = {
  getAllPost(params) {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },
  getPostById(id) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  addNewPost(data) {
    const url = '/posts';
    return axiosClient.post(url, data);
  },
  updatePost(id, updatedData) {
    const url = `/posts/${id}`;
    return axiosClient.patch(url, updatedData);
  },
  deletePost(id) {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
};
export default postApi;
