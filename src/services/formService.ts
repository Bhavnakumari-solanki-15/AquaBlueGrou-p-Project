import { supabase } from '../lib/supabase';
import { JoinUsFormData, ContactUsFormData, TenantDownFormData, TABLES } from '../types/forms';

export class FormService {
  // Join Us Form Submission
  static async submitJoinUsForm(data: JoinUsFormData): Promise<{ success: boolean; error?: string }> {
    try {
      let fileUrl: string | null = null;
      if (data.file) {
        const uploadResult = await FormService.uploadFile(data.file, 'join-us-resumes');
        if (!uploadResult.success) {
          return { success: false, error: uploadResult.error };
        }
        fileUrl = uploadResult.url || null;
      }

      const { error } = await supabase
        .from(TABLES.JOIN_US)
        .insert([
          {
            full_name: data.name,
            phone: data.phone,
            email: data.email || null,
            state: data.state,
            district: data.district,
            area: data.area,
            created_at: new Date().toISOString(),
            file_url: fileUrl
          }
        ]);

      if (error) {
        console.error('Error submitting Join Us form:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error submitting Join Us form:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Contact Us Form Submission
  static async submitContactUsForm(data: ContactUsFormData): Promise<{ success: boolean; error?: string }> {
    try {
      let fileUrl: string | null = null;
      if (data.file) {
        const uploadResult = await FormService.uploadFile(data.file, 'uploads');
        if (!uploadResult.success) {
          return { success: false, error: uploadResult.error };
        }
        fileUrl = uploadResult.url || null;
      }

      const { error } = await supabase
        .from(TABLES.CONTACT_US)
        .insert([
          {
            question: data.question,
            email: data.email,
            description: data.description,
            created_at: new Date().toISOString(),
            file_url: fileUrl || null
          }
        ]);

      if (error) {
        console.error('Error submitting Contact Us form:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error submitting Contact Us form:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Tenant Down Form Submission
  static async submitTenantDownForm(data: TenantDownFormData): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from(TABLES.TENANT_DOWN)
        .insert([
          {
            name: data.name,
            email: data.email,
            tenant_url: data.tenantUrl,
            description: data.description,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting Tenant Down form:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error submitting Tenant Down form:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // File Upload Helper (if needed for future use)
  static async uploadFile(file: File, bucket: string): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return { success: false, error: uploadError.message };
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Delete Join Us Submission
  static async deleteJoinUsSubmission(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from(TABLES.JOIN_US)
        .delete()
        .eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  // Delete Contact Us Submission
  static async deleteContactUsSubmission(id: number): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from(TABLES.CONTACT_US)
        .delete()
        .eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
} 