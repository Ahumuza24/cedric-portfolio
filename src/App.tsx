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
            <a href="#main-content" className="skip-link">Skip to content</a>
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
                        background: '#0B101C',
                        color: '#F4F7FF',
                        border: '1px solid rgba(110,243,255,0.22)',
                        borderRadius: '14px',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '12px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#66F6D2',
                            secondary: '#05070D',
                        },
                    },
                }}
            />
        </BrowserRouter>
    )
}
