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
    // 401 응답 코드 처리
    if (error.response && error.response.status === 401) {
      // URL 경로에 따라 리다이렉트 분기
      const isAdminPath = window.location.pathname.startsWith('/admin');
      const loginPath = isAdminPath ? '/admin/login' : '/login';
      window.location.href = loginPath;
    }
    return Promise.reject(error);
  }
);

export { api, api_formData };
// export default api;