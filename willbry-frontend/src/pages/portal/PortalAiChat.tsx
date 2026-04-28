import { Bot, Download, FileText, Package, ShoppingBag } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import ChatWindow from '../../components/portal/ChatWindow'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalAiChat() {
  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              AI assistant
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Ask WillBry AI about farming
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Get practical guidance on crops, pests, post-harvest handling, value addition,
              and farming decisions.
            </p>
          </div>

          <ChatWindow />
        </div>
      </section>
    </main>
  )
}