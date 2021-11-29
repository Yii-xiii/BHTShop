import axios from "axios";

class Api {
	async post(path, item) {
		try {
			const res = await axios.post(path,item);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async put(path, item) {
		try {
			const res = await axios.post(path,item);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}

	}

	async delete(path) {
		try {
			const res = await axios.delete(path);
			const res_data = await res.data;
			//console.log(res.data);
			return res_data;
		} catch (err) {
			console.log(err);
		}
  	}

	async get(path) {
		try {
			const res = await axios.get(path);
			const res_data = await res.data;
			return res_data;
		} catch (err) {
			console.log(err);
		}
	}	


	getProductList = () => {
		let data = this.get(`/products/`);
		return data;
	}

	getProduct = (id) => {
		let data = this.get(`/products/${id}/`);
		return data;
	}

	createProduct = (title, description) => {
		let data = this.post(`/products/create/`,{title, description});
		return data;
	}

	updateProduct = (id,title, description) => {
		let data = this.put(`/products/${id}/`,{title, description});
		return data;
	}

	deleteProduct = (id) => {
		let data = this.delete(`/products/${id}/`);
		return data;
	}
}

const api = new Api()

export default api;