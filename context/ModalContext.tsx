import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalData {
	id: string;
	isOpen: boolean;
	openModal: (id?: string) => void;
	closeModal: () => void;
}
const ModalContext = createContext<ModalData | undefined>(undefined);

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

type ModalProviderProps = {
	children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState("");
	const openModal = (id?: string) => {
		setIsOpen(true);
		if (id) {
			setId(id);
		}
	};
	const closeModal = () => {
		setIsOpen(false);
		setId("");
	};
	console.log(id);

	const modalData = {
		isOpen,
		openModal,
		closeModal,
		id,
	};

	return (
		<ModalContext.Provider value={modalData}>{children}</ModalContext.Provider>
	);
};
