import Head from 'next/head';
import Header from '../../../components/header/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginForm />
  );
}