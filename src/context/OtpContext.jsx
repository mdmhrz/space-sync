// context/OtpContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const OtpContext = createContext(null);

export function OtpProvider({ children }) {
    const [otpData, setOtpData] = useState(null);
    return (
        <OtpContext.Provider value={{ otpData, setOtpData }}>
            {children}
        </OtpContext.Provider>
    );
}

export function useOtp() {
    return useContext(OtpContext);
}
