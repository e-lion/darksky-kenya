# Airtable Events Management Setup

This document explains how to set up and use Airtable as a simple CMS for managing events on the DarkSky Kenya website.

## 1. Setting Up Airtable

### Create a New Airtable Base
1. Sign up for or log into Airtable: [https://airtable.com/](https://airtable.com/)
2. Create a new base (you can start from scratch)
3. Name your base "DarkSky Kenya Events" or similar

### Configure the Events Table
1. Rename the first table to "Events"
2. Set up the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Title | Single line text | Event title (required) |
| Date | Date | Event date (required) |
| Time | Single line text | Event time (e.g., "7:00 PM - 9:00 PM") |
| Location | Single line text | Event location |
| Description | Long text | Full event description |
| Image | Attachment | Event image (first image will be used) |
| RegistrationLink | URL | Link to registration/tickets |
| Category | Single select | Event category (e.g., "Stargazing", "Workshop", "Conference") |
| Published | Checkbox | Whether the event should be displayed on the website |

3. Create some sample events to test the setup

### Get API Credentials
1. Go to [https://airtable.com/account](https://airtable.com/account) to find or create your API key
2. Copy your API key
3. Go to your base and click on "Help" in the top-right corner, then select "API documentation"
4. In the API documentation, you'll find your Base ID in the URL or in the documentation page

## 2. Connecting to Your Next.js Application

### Set Environment Variables
1. Create a `.env.local` file in the root of your project (using the provided `.env.local.example` as a template)
2. Add your Airtable credentials:
   ```
   AIRTABLE_API_KEY=your_airtable_api_key_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   ```

### Install Dependencies
Run the following command to install the Airtable package:
```
pnpm add airtable
```

## 3. Managing Events

### Adding New Events
1. Log into your Airtable account
2. Navigate to your "DarkSky Kenya Events" base
3. Add a new row to the "Events" table with all the necessary information
4. Make sure the "Published" checkbox is checked for the event to appear on the website

### Editing Events
1. Find the event you want to edit in the Airtable "Events" table
2. Update any fields as needed
3. Changes will be reflected on the website within an hour (due to caching)

### Removing Events
To remove an event from the website without deleting it from Airtable:
1. Uncheck the "Published" checkbox for that event

To permanently delete an event:
1. Select the event row
2. Right-click and select "Delete record" or use the delete button

## 4. Best Practices

### Event Images
- Use high-quality, landscape-oriented images (16:9 or 3:2 aspect ratio)
- Optimal image size: 1200 × 675 pixels
- Keep file sizes under 2MB for better performance
- Use descriptive filenames for better organization

### Event Descriptions
- Use clear, concise language
- Break up long descriptions with paragraphs (use line breaks)
- Include all essential information: what, when, where, who, why
- Consider using bullet points for key details

### Categories
Common categories you might want to use:
- Stargazing
- Workshop
- Conference
- Community Event
- Educational
- Conservation
- Policy & Advocacy

### Other Tips
- Schedule regular time for event updates (weekly or bi-weekly)
- Archive past events rather than deleting them (by unchecking "Published")
- Consider creating views in Airtable to better organize your events (e.g., "Upcoming Events", "Past Events", "Draft Events")

## 5. Troubleshooting

### Events Not Showing Up
If events aren't appearing on the website:
1. Check that the "Published" checkbox is checked
2. Verify the event date is correct and in the future
3. Confirm your API key and Base ID are correctly set in your environment variables
4. Check the server logs for any error messages related to Airtable

### API Rate Limits
Airtable has rate limits on their API:
- Free plan: 5 requests per second, 1,200 requests per hour
- If you're hitting rate limits, consider implementing more aggressive caching

### Image Issues
If images aren't displaying correctly:
1. Ensure images are properly uploaded to Airtable
2. Check that the image URL is valid and accessible
3. Verify the image file size isn't too large

## 6. Future Enhancements

Consider these future improvements:
- Add event filtering by category
- Implement event search functionality
- Add calendar view integration
- Create admin notification system for new event submissions
- Develop event attendance tracking

For more assistance with Airtable, refer to their [official documentation](https://support.airtable.com/).
