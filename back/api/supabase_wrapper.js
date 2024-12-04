const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); 
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PASS
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase;