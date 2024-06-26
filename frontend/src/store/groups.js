
import { csrfFetch } from './csrf.js';

const GET_GROUPS = '/get-groups'

const GET_GROUP_ID = '/get-groups-by-id'

const GET_MEMBERSHIPS = '/get-memberships'

const CREATE_GROUP = '/create-group'

const ADD_GROUP_IMAGE = '/add-group-image'

const DELETE_GROUP = '/delete-the-group'

const UPDATE_GROUP = '/update-the-group'

const getMemberships = (groupId, memberships) => ({
    type: GET_MEMBERSHIPS,
    memberships
})

const getGroups = (groups) => ({
    type: GET_GROUPS,
    groups
});

const getGroupsId = (groupId, group) => ({
    type: GET_GROUP_ID,
    group
})

const createGroup = (payload, payloadTwo) => ({
    type: CREATE_GROUP,
    payload,
    payloadTwo
})

const addGroupImage = () => ({
    type: ADD_GROUP_IMAGE,
    
})

const deleteGroup = (groupId) => ({
    type: DELETE_GROUP,
    groupId
})

const updateGroup = (groupId, payload) => ({
    type: UPDATE_GROUP,
    payload
})

export const getAllMemberships = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`);
    const data = await response.json();
    dispatch(getMemberships(groupId, data));
    return response;
  };

export const getAllGroups = () => async dispatch => {
    const response = await csrfFetch("/api/groups");
    const data = await response.json();
    dispatch(getGroups(data.Groups));
    return response;
  };

  export const getAllGroupsId = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`);
    const data = await response.json();
    dispatch(getGroupsId(groupId, data));
    return response;
  };

  export const createAGroup = (payload, payloadTwo) => async dispatch => {
   
        const response = await csrfFetch('/api/groups/', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()
        dispatch(createGroup(data));

        const responseTwo = await csrfFetch(`/api/groups/${data.id}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadTwo)
        })

        const dataTwo = await responseTwo.json()

        dispatch(addGroupImage(dataTwo))
        return data

        
  }



  export const deleteTheGroup = (groupId) => async dispatch => {

    
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    
    dispatch(deleteGroup(data))
    return data
  }

  export const updateTheGroup = (groupId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        const data = await response.json()
        console.log(data.id)
        dispatch(updateGroup(data))
        return data
  }


const initialState = {}

function groupsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_GROUPS:
            return {...state, Groups: action.groups}
        case GET_GROUP_ID:
            return {...state, GroupById: action.group}
        case GET_MEMBERSHIPS:
            return {...state, Memberships: action.memberships}
        case CREATE_GROUP:
            return {...state, Groups: [action.payload], GroupImage: [action.payloadTwo]}
        // case ADD_GROUP_IMAGE:
        //     return {...state, GroupImage: [action.payload]}
        case DELETE_GROUP:{
            const newState = {...state}
            delete newState[action.data]
            return newState
        }
        case UPDATE_GROUP:
            return {...state, Updated: action.data}
           
        default:
            return state;
    }
    
    
}

export default groupsReducer;