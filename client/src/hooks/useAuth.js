import { useRecoilValue } from 'recoil';
import { jwtDecode } from 'jwt-decode';
import tokenAtom from '../atoms/tokenAtom'; // Assuming you define atoms in a separate file

const useAuth = () => {
  const token = useRecoilValue(tokenAtom);
  let isCompany = false;
  let isAdmin = false;
  let status = 'User';

  if (token) {
    const decoded = jwtDecode(token);
    const { email, roles } = decoded.UserInfo;

    isCompany = roles.includes('Company');
    isAdmin = roles.includes('Admin');

    if (isCompany) status = 'Company';
    if (isAdmin) status = 'Admin';

    return { email, roles, status, isCompany, isAdmin };
  }

  return { email: '', roles: [], isCompany, isAdmin, status };
};

export default useAuth;
