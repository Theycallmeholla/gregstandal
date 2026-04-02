import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/contractors?variant=v2_original');
}
