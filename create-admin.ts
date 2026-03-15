import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import { resolve } from 'path';

// Load environment variables directly from .env file manually
const envPath = resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig: Record<string, string> = {};

envContent.split('\n').forEach(line => {
  const cleanLine = line.replace(/\r/g, '').trim();
  const match = cleanLine.match(/^([^=]+)=(.*)$/);
  if (match) {
    envConfig[match[1]] = match[2].trim();
  }
});

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL'] || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = envConfig['SUPABASE_SERVICE_ROLE_KEY'] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or Service Key in .env");
  process.exit(1);
}

// Create a Supabase client with the service role key to bypass RLS and use Admin API
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const adminEmail = 'admin@scm-platform.com';
  const adminPassword = 'AdminPassword123!';
  const adminFullName = 'System Administrator';

  console.log('Creating admin user...');
  
  // 1. Create the user in Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true, // Auto-confirm email
    user_metadata: {
      full_name: adminFullName
    }
  });

  if (authError) {
    if (authError.message.includes('already exists')) {
      console.log('User already exists in Auth. Looking up ID...');
      // We'll proceed to update their role just in case
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers?.users.find(u => u.email === adminEmail);
      
      if (existingUser) {
        await updateProfileRole(existingUser.id, adminEmail, adminFullName);
      }
      return;
    }
    console.error('Error creating auth user:', authError);
    return;
  }

  console.log('User created successfully in Auth! ID:', authData.user.id);
  
  // 2. Insert/Update the profile with 'Admin' role
  await updateProfileRole(authData.user.id, adminEmail, adminFullName);
}

async function updateProfileRole(userId: string, email: string, fullName: string) {
  console.log('Updating user profile to Admin role...');
  
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email: email,
      full_name: fullName,
      role: 'Admin'
    });

  if (profileError) {
    console.error('Error updating profile:', profileError);
    return;
  }

  console.log('==================================================');
  console.log('✅ SECURE ADMIN ACCOUNT CREATED SUCCESSFULLY');
  console.log('==================================================');
  console.log(`Email    : ${email}`);
  console.log(`Password : AdminPassword123!`);
  console.log('==================================================');
  console.log('You can now log in with these credentials.');
}

createAdmin();
