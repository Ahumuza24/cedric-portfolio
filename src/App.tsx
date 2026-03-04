import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator'
import ScrollToTop from '@/components/ScrollToTop'

const Home = lazy(() => import('@/pages/Home'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
    return (
        <BrowserRouter>
            <ScrollProgressIndicator />
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <ScrollToTop />
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1C1C1C',
                        color: '#F5F5F2',
                        border: '1px solid rgba(228,87,46,0.3)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#E4572E',
                            secondary: '#F5F5F2',
                        },
                    },
                }}
            />
        </BrowserRouter>
    )
}
