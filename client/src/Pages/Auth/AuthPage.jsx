import { useRecoilValue } from "recoil";
import LoginCard from "../../components/authentications/LoginCard";
import CompanyLogin from "../../components/authentications/CompanyLogin";
import SignUpCard from "../../components/authentications/SignUpCard";
import CompanySignUp from "../../components/authentications/CompanySignUp";
import { Box } from "@chakra-ui/react";
import authScreenAtom from "../../atoms/authAtom";
import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";

const AuthPage = () => {
	const authScreenState = useRecoilValue(authScreenAtom);
	const logout = useLogout();

	useEffect(() => {
		logout();
	}, []);

	return (
		<Box as="section" bg={"#fff"}>
			<> {authScreenState === "login" ? <LoginCard /> : <SignUpCard /> : <CompanyLogin /> : <CompanySignUp />} </>
		</Box> 
	);
};

export default AuthPage;
