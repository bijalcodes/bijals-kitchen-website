import { client } from '../../lib/sanity'
import { groq } from 'next-sanity'
import { mockMenuItems } from '../../lib/mockData'

const MENU_QUERY = groq`
  *[_type == "menuItem" && isAvailable != false] | order(category asc, sortOrder asc, name asc) {
    _id,
    name,
    description,
    category,
    quarterPrice,
    halfPrice,
    fullPrice,
    specialPricing,
    image,
    isAvailable,
    sortOrder
  }
`

interface MenuItem {
  _id: string
  name: string
  description?: string
  category: string
  quarterPrice?: number
  halfPrice?: number
  fullPrice?: number
  specialPricing?: string
  image?: unknown
  isAvailable?: boolean
  sortOrder?: number
}

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    return await client.fetch(MENU_QUERY)
  } catch (error) {
    console.error('Error fetching menu items from Sanity, using mock data:', error)
    // Return mock data for local development
    return mockMenuItems
  }
}

export default async function Home() {
  const menuItems = await getMenuItems()
  
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-orange-500 font-bold">BK</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            BIJAL&apos;S KITCHEN
          </h1>
          <p className="text-xl mb-4">510-579-7729</p>
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        {Object.entries(groupedItems).map(([category, items]) => (
          <section key={category} className="mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-6 px-8">
                <h2 className="text-3xl font-bold text-center uppercase tracking-wide">
                  {category}
                </h2>
                {category !== 'SNACKS' && (
                  <div className="flex justify-end mt-4 text-lg font-semibold pr-8">
                    <div className="flex gap-8">
                      <span className="w-16 text-center">Quarter</span>
                      <span className="w-16 text-center">Half</span>
                      <span className="w-16 text-center">Full</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                    
                    {category === 'SNACKS' ? (
                      <div className="text-xl font-bold text-orange-600">
                        ${item.quarterPrice || item.halfPrice || item.fullPrice}
                        {item.specialPricing ? `/${item.specialPricing}` : 
                         (item.name.includes('Piece') || item.name.includes('Person') ? '' : '/Piece')}
                      </div>
                    ) : (
                      <div className="flex gap-8 text-lg font-semibold">
                        <span className="w-16 text-center text-orange-600">
                          {item.quarterPrice ? `$${item.quarterPrice}` : '-'}
                        </span>
                        <span className="w-16 text-center text-orange-600">
                          {item.halfPrice ? `$${item.halfPrice}` : '-'}
                        </span>
                        <span className="w-16 text-center text-orange-600">
                          {item.fullPrice ? `$${item.fullPrice}` : '-'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Menu items will appear here once you set up your Sanity CMS and add content.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">BIJAL&apos;S KITCHEN</h3>
          <p className="text-lg font-semibold">510-579-7729</p>
          <p className="mt-4 text-sm opacity-90">
            Authentic home-style cooking • Fresh ingredients • Made with love
          </p>
        </div>
      </footer>
    </div>
  )
}
