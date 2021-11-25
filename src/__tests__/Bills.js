/**
 * @jest-environment jsdom
 */

 import { screen } from "@testing-library/dom"
 import userEvent from '@testing-library/user-event';
 import { localStorageMock } from '../__mocks__/localStorage';
 import { bills } from "../fixtures/bills.js"
 import { ROUTES } from '../constants/routes';
 import BillsUI from "../views/BillsUI.js"
 import Bills from '../containers/Bills';
 import firebase from '../__mocks__/firebase';
 
 const onNavigate = (pathname) => {
   document.body.innerHTML = ROUTES({ pathname })
 }
 
 describe("Given I am connected as an employee", () => {
   describe('When I am on Bills page but it is loading', () => {
     test('Then, Loading page should be rendered', () => {
       const html = BillsUI({ loading: true })
       document.body.innerHTML = html
 
       expect(screen.getAllByText('Loading...')).toBeTruthy()
     })
   })
 
   describe('When I am on Bills page but back-end send an error message', () => {
     test('Then, Error page should be rendered', () => {
       const html = BillsUI({ error: 'some error message' })
       document.body.innerHTML = html
 
       expect(screen.getAllByText('Erreur')).toBeTruthy()
     })
   })
 
   describe("When I am on Bills Page", () => {
     beforeEach(() => {
       document.body.innerHTML = BillsUI({ data: bills })
 
       Object.defineProperty(window, 'localStorage', { value: localStorageMock })
       window.localStorage.setItem('user', JSON.stringify({
         type: 'Employee'
       }))
     })
 
     test("Then bills should be ordered from earliest to latest", () => {
       const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
       const antiChrono = (a, b) => ((a < b) ? 1 : -1)
       const datesSorted = [...dates].sort(antiChrono)
 
       expect(dates).toEqual(datesSorted)
     })
 
     describe("When I click on the New bill button", () => {
       test("Then I should be redirected to new bill form", () => {
         const billsContainer = new Bills({
           document, onNavigate, firestore: null, localStorage: window.localStorage
         })
 
         const handleClickNewBill = jest.fn(billsContainer.handleClickNewBill)
         const newBillButton = screen.getByTestId('btn-new-bill')
         newBillButton.addEventListener('click', handleClickNewBill)
         userEvent.click(newBillButton)
 
         expect(handleClickNewBill).toHaveBeenCalled()
         expect(screen.getByText('Envoyer une note de frais')).toBeTruthy()
       })
     })
   })
 
   // test d'intégration GET
   describe("Given that I am at Bills", () => {
     const getRequest = jest
       .fn(firebase.get)
       .mockImplementationOnce(firebase.get)
       .mockImplementationOnce(() => Promise.reject(new Error('Erreur 404')))
       .mockImplementationOnce(() => Promise.reject(new Error('Erreur 500')))
 
     test("Get bills from the mock API GET", async () => {
       const bills = await getRequest()
       const { data } = bills
       expect(getRequest).toHaveBeenCalledTimes(1)
       expect(data.length).toBe(4)
     })
     test("get bills from the API and 404 message error when fails", async () => {
       let response
       try {
         response = await getRequest()
       } catch (e) {
         response = {error: e}
       }
       document.body.innerHTML = BillsUI(response)
       expect(getRequest).toHaveBeenCalledTimes(2)
       expect(screen.getByText(/Erreur 404/)).toBeTruthy()
     })
     test("get bills from the API and 500 message error when fails", async () => {
       let response
       try {
         response = await getRequest()
       } catch (e) {
         response = {error: e}
       }
       document.body.innerHTML = BillsUI(response)
       expect(getRequest).toHaveBeenCalledTimes(3)
       expect(screen.getByText(/Erreur 500/)).toBeTruthy()
     })
   })
 })
 


  