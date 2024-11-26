import axios from 'axios';
import { backendURL } from './URLs';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json',
    // 필요한 경우 기본적으로 추가할 헤더를 설정할 수 있습니다.
  },
});

const api_formData = axios.create({
  baseURL: backendURL,
  headers: {
  },
});


// 응답 인터셉터 추가
api.interceptors.response.use(
  response => response, // 정상 응답 시 그대로 반환
  error => {
    // 402 응답 코드 처리
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);

export { api, api_formData };
// export default api;