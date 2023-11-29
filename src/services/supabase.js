
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://cnijnmiqlomynvbikeaa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaWpubWlxbG9teW52YmlrZWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNjgwODUsImV4cCI6MjAxNjg0NDA4NX0.Q-_u0Pw30tzuLj3gfZjKlT4kZBjb0-eI3WTbI227EsQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase