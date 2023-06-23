import React from "react"
import { Navigate } from "react-router-dom";

type T_ProtectedProps = {
	isSignedIn: boolean;
	children: React.ReactNode;
}

const Protected = ({ isSignedIn, children }: T_ProtectedProps) => {
	if (!isSignedIn) {
		return <Navigate to="/auth/login" replace />
	}
	return <>{children}</>
}

export default Protected
