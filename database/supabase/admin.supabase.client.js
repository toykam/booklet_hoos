const { createClient } = require("@supabase/supabase-js")

const supabaseAdminClient = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SECRET_KEY']
)

module.exports = {supabaseAdminClient}