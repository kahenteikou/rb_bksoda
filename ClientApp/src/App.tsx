import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Page404 from './pages/Page404';
import UserManagerPage from './pages/UserManagerPage';

class App extends React.Component{
    public render():React.ReactNode{
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />}/>
                    <Route path="/index.html" element={<IndexPage />}/>
                    <Route path="/404.html" element={<Page404 />} />
                    <Route path="/usermanager.html" element={<UserManagerPage />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
export default App;