/**
 * @jest-environment jsdom
 */
// import { screen } from "@testing-library/dom"
// import NewBillUI from "../views/NewBillUI.js"
// import NewBill from "../containers/NewBill.js"


// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then ...", () => {
//       const html = NewBillUI()
//       document.body.innerHTML = html
//       //to-do write assertion
//     })
//   })
// })

import { screen, fireEvent } from '@testing-library/dom';
import { localStorageMock } from '../__mocks__/localStorage.js';
import { ROUTES } from '../constants/routes';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';

const initPage = () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }));
  const onNavigate = (pathname) => { document.body.innerHTML = ROUTES({ pathname }) };
  document.body.innerHTML = NewBillUI(); 
  const newBill = new NewBill({
    document,
    onNavigate,
    firestore: false,
    localStorage: window.localStorage,
  });
  return newBill;
};

// Test to check that a new valid file is added to the bill
describe('Given I am connected as an employee', () => {
  describe('Given I am on NewBill Page', () => {
    describe('When I add a new file to the bill', () => {
      it('Then this file changes in the input', () => {
        const newBill = initPage();
        const handleChangeFile = jest.fn(newBill.handleChangeFile);
        const inputFile = screen.getByTestId('file');
        inputFile.addEventListener('change', handleChangeFile);
        fireEvent.change(inputFile, { target: { files: [new File(['image.jpg'], 'image.jpg', { type: 'image/jpg' })] } });
        expect(handleChangeFile).toHaveBeenCalled();
        expect(inputFile.files[0].name).toBe('image.jpg');
      });
    });
    it('Then click to button submit', () => {
      const newBill = initPage();
      const handleSubmit = jest.fn(newBill.handleSubmit);
      const submitBtn = screen.getByTestId('form-new-bill');
      submitBtn.addEventListener('submit', handleSubmit);
      fireEvent.submit(submitBtn);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});