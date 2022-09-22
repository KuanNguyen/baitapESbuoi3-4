
export default class TodoListService {
    getTodoList = () => {
        return axios({
            method: "get",
            url: "https://632578f770c3fa390f88d2b0.mockapi.io/work",
          });
    }
    
    addWork = (work) => {
        return axios({
            method: "post",
            url: "https://632578f770c3fa390f88d2b0.mockapi.io/work",
            data: work,
          });    
    }
    
    deleteWork = (id) => {
        return axios({
            method: "delete",
            url: `https://632578f770c3fa390f88d2b0.mockapi.io/work/${id}`,
        }); 
    }
    
    workDetail = (id) => {
        return axios({
            method: 'get',
            url: `https://632578f770c3fa390f88d2b0.mockapi.io/work/${id}`,
        }); 
    }

    updateWorkDetail = (id, work) => {
        return axios({
            method: 'put',
            url:`https://632578f770c3fa390f88d2b0.mockapi.io/work/${id}`,
            data: work,
        }); 
    }
}

