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

	getCustomer = (id) => {
		let data = this.get(`/customers/${id}/`);
		return data;
	}

	createCustomer = (username, password, phoneNumber, address) => {
		let data = this.post(`/customers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateCustomer = (id,username, password, phoneNumber, address) => {
		let data = this.put(`/customers/${id}/`,{username, password, phoneNumber, address});
		return data;
	}

	deleteCustomer = (id) => {
		let data = this.delete(`/customers/${id}/`);
		return data;
	}

	getSeller = (id) => {
		let data = this.get(`/sellers/${id}/`);
		return data;
	}

	createSeller = (username, password, phoneNumber, address) => {
		let data = this.post(`/sellers/create/`,{username, password, phoneNumber, address});
		return data;
	}

	updateSeller = (id,username, password, phoneNumber, address) => {
		let data = this.put(`/sellers/${id}/`,{username, password, phoneNumber, address});
		return data;
	}

	deleteSeller = (id) => {
		let data = this.delete(`/sellers/${id}/`);
		return data;
	}
}

const api = new Api()

export default api;