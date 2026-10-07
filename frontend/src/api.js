import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/chatbot'; // Updated base URL for chatbot endpoints

// Helper function to handle axios responses
const handleResponse = (response) => {
  if (!response.status === 200) {
    throw new Error(response.data.error || `HTTP error! Status: ${response.status}`);
  }
  return response.data;
};

// Send a chat message to the backend using POST method (axios)
export const sendChatMessage = async ({ message, model, conversationId }) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.post(
      `${BASE_URL}/chat/send-message/`,
      { message, model, conversationId },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return handleResponse(response);
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Fetch all conversations for the authenticated user using GET method (axios)
export const fetchConversations = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.get(`${BASE_URL}/conversations/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Fetch a specific conversation and its messages using GET method (axios)
export const fetchConversation = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.get(`${BASE_URL}/conversations/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Create a new conversation using POST method (axios)
export const createConversation = async ({ title, model }) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.post(
      `${BASE_URL}/conversations/`,
      { title, model },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return handleResponse(response);
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Update a conversation using PUT method (axios)
export const updateConversation = async (id, data) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.put(
      `${BASE_URL}/conversations/${id}/`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return handleResponse(response);
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Delete a conversation using DELETE method (axios)
export const deleteConversation = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token found');

    const response = await axios.delete(`${BASE_URL}/conversations/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Axios returns a status code but no content for DELETE requests (204 No Content)
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete conversation');
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};
