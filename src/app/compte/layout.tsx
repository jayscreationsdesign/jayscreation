import AccountLayout from '@/components/account/AccountLayout'

export default function CompteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AccountLayout>{children}</AccountLayout>
}
