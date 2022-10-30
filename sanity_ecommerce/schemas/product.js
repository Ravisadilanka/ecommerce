export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields:[
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name:'slug',
            title: 'Slug',
            type:'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
          name: 'specification',
          title: 'Specification',
          type: 'array',
          of: [
              {
                type: 'block'
              },
              {
                type: 'image',
                fields: [
                  {
                    type: 'text',
                    name: 'alt',
                    title: 'Alternative text',
                    description: `Some of your visitors cannot see images, 
                      be they blind, color-blind, low-sighted; 
                      alternative text is of great help for those 
                      people that can rely on it to have a good idea of 
                      what\'s on your page.`,
                    options: {
                      isHighlighted: true
                    }
                  }
                ]
              }
            ]
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                  type: 'block'
                },
                {
                  type: 'image',
                  fields: [
                    {
                      type: 'text',
                      name: 'alt',
                      title: 'Alternative text',
                      description: `Some of your visitors cannot see images, 
                        be they blind, color-blind, low-sighted; 
                        alternative text is of great help for those 
                        people that can rely on it to have a good idea of 
                        what\'s on your page.`,
                      options: {
                        isHighlighted: true
                      }
                    }
                  ]
                }
              ]
        }
    ]
}