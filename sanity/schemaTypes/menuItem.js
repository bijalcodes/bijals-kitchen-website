export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Dish Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Curries', value: 'CURRIES'},
          {title: 'Sweet', value: 'SWEET'},
          {title: 'Dal', value: 'DAL'},
          {title: 'Rice', value: 'RICE'},
          {title: 'Others', value: 'OTHERS'},
          {title: 'Appetizers', value: 'APPETIZERS'},
          {title: 'Snacks', value: 'SNACKS'}
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the dish (optional)'
    },
    {
      name: 'quarterPrice',
      title: 'Quarter Price ($)',
      type: 'number',
      description: 'Price for quarter portion'
    },
    {
      name: 'halfPrice', 
      title: 'Half Price ($)',
      type: 'number',
      description: 'Price for half portion'
    },
    {
      name: 'fullPrice',
      title: 'Full Price ($)', 
      type: 'number',
      description: 'Price for full portion'
    },
    {
      name: 'specialPricing',
      title: 'Special Pricing Info',
      type: 'string',
      description: 'For items with special pricing (e.g., "Per Piece", "Per Person", "60 pieces")'
    },
    {
      name: 'image',
      title: 'Dish Image',
      type: 'image',
      description: 'Upload a photo of the dish (optional)',
      options: {
        hotspot: true
      }
    },
    {
      name: 'isAvailable',
      title: 'Currently Available',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily hide this item from the menu'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first (optional)'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      quarterPrice: 'quarterPrice',
      halfPrice: 'halfPrice', 
      fullPrice: 'fullPrice'
    },
    prepare(selection) {
      const {title, subtitle, quarterPrice, halfPrice, fullPrice} = selection
      let price = ''
      if (quarterPrice) price += `Q:$${quarterPrice} `
      if (halfPrice) price += `H:$${halfPrice} `
      if (fullPrice) price += `F:$${fullPrice}`
      
      return {
        title: title,
        subtitle: `${subtitle} - ${price}`,
        media: selection.media
      }
    }
  }
}