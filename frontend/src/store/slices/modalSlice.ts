import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
  isSignupModalOpen: boolean
  openInLoginMode: boolean
}

const initialState: ModalState = {
  isSignupModalOpen: false,
  openInLoginMode: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignupModal: (state) => {
      console.log("hi", state.isSignupModalOpen)
      state.isSignupModalOpen = true
      state.openInLoginMode = false
      console.log("hi", state.isSignupModalOpen)
    },
    openLoginModal: (state) => {
      state.isSignupModalOpen = true
      state.openInLoginMode = true
    },
    closeSignupModal: (state) => {
            console.log('🔴🔴🔴 CLOSING MODAL - WHO DID THIS? 🔴🔴🔴');

      state.isSignupModalOpen = false
      state.openInLoginMode = false
    },
    toggleSignupModal: (state) => {
      state.isSignupModalOpen = !state.isSignupModalOpen
    }
  }
})

export const { openSignupModal, openLoginModal, closeSignupModal, toggleSignupModal } = modalSlice.actions
export default modalSlice.reducer
