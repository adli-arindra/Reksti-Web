// app/sign-in/page.js
import { Suspense } from 'react';
import SignInPageContent from './content'; // Assuming your current code is in SignInPageContent.jsx

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading sign-in form...</div>}>
        <SignInPageContent />
        </Suspense>
    );
}