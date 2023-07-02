import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Page404 from './pages/Page404';
import UserManagerPage from './pages/UserManagerPage';
import QuestionManagerPage from './pages/QuestionManagerPage';
import QuestionSetManagerPage from './pages/QuestionSetManagerPage';
import QuestionSetEditPage from './pages/QuestionSetEditPage';
import ScreenControllerPage from './pages/ScreenControllerPage';
import TargetScreenPage from './pages/TargetScreenPage';
class App extends React.Component{
    public render():React.ReactNode{
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IndexPage />}/>
                    <Route path="/index.html" element={<IndexPage />}/>
                    <Route path="/404.html" element={<Page404 />} />
                    <Route path="/usermanager.html" element={<UserManagerPage />} />
                    <Route path="/questionmanager.html" element={<QuestionManagerPage />} />
                    <Route path="/questionsetmanager.html" element={<QuestionSetManagerPage />} />
                    <Route path="/questionsetedit.html" element={<QuestionSetEditPage/>}/>
                    <Route path="/targetscreen.html" element={<TargetScreenPage/>}/>
                    <Route path="/screencontroller.html" element={<ScreenControllerPage/>}/>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
export default App;