import { useEffect, useState, useCallback } from 'react';
import contentManager, { ContentData } from '../lib/ContentManager';

// Hook pour accéder et mettre à jour le contenu globalement
export function useContent() {
  const [content, setContent] = useState<ContentData>(contentManager.getAll());

  // S'abonner aux changements de contenu
  useEffect(() => {
    const handleStorageChange = () => {
      setContent(contentManager.getAll());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ─── CALLBACKS POUR METTRE À JOUR ────────────────────────────────

  const updateHero = useCallback((data: Partial<typeof content.hero>) => {
    contentManager.updateHero(data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateProgram = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateProgram(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addProgram = useCallback((program: any) => {
    contentManager.addProgram(program);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProgram = useCallback((id: string) => {
    contentManager.deleteProgram(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAbout = useCallback((data: Partial<typeof content.about>) => {
    contentManager.updateAbout(data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addFeature = useCallback((feature: any) => {
    contentManager.addFeature(feature);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFeature = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateFeature(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFeature = useCallback((id: string) => {
    contentManager.deleteFeature(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addTestimonial = useCallback((testimonial: any) => {
    contentManager.addTestimonial(testimonial);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTestimonial = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateTestimonial(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    contentManager.deleteTestimonial(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addBlogPost = useCallback((post: any) => {
    contentManager.addBlogPost(post);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBlogPost = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateBlogPost(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    contentManager.deleteBlogPost(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addBlogComment = useCallback((postId: string, comment: any) => {
    contentManager.addBlogComment(postId, comment);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBlogComment = useCallback((postId: string, commentId: string) => {
    contentManager.deleteBlogComment(postId, commentId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBlogReaction = useCallback((postId: string, emoji: string, userId: string) => {
    contentManager.addBlogReaction(postId, emoji, userId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeBlogReaction = useCallback((postId: string, emoji: string, userId: string) => {
    contentManager.removeBlogReaction(postId, emoji, userId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMessage = useCallback((message: any) => {
    contentManager.addMessage(message);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markMessageAsRead = useCallback((messageId: string) => {
    contentManager.markMessageAsRead(messageId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addMessageReply = useCallback((messageId: string, reply: any) => {
    contentManager.addMessageReply(messageId, reply);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    contentManager.deleteMessage(messageId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addApplication = useCallback((app: any) => {
    contentManager.addApplication(app);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateApplicationStatus = useCallback((appId: string, status: any) => {
    contentManager.updateApplicationStatus(appId, status);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteApplication = useCallback((appId: string) => {
    contentManager.deleteApplication(appId);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateContact = useCallback((data: Partial<typeof content.contact>) => {
    contentManager.updateContactSection(data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHeader = useCallback((data: Partial<typeof content.header>) => {
    contentManager.updateHeader(data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFooter = useCallback((data: Partial<typeof content.footer>) => {
    contentManager.updateFooter(data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── TEAM / GOVERNANCE ────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addTeamMember = useCallback((member: any) => {
    contentManager.addTeamMember(member);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTeamMember = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateTeamMember(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTeamMember = useCallback((id: string) => {
    contentManager.deleteTeamMember(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── STUDENT ACTIVITIES ────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addStudentActivity = useCallback((activity: any) => {
    contentManager.addStudentActivity(activity);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateStudentActivity = useCallback((id: string, data: Partial<any>) => {
    contentManager.updateStudentActivity(id, data);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteStudentActivity = useCallback((id: string) => {
    contentManager.deleteStudentActivity(id);
    setContent(contentManager.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // Données
    content,

    // Hero
    updateHero,

    // Programs
    addProgram,
    updateProgram,
    deleteProgram,

    // About
    updateAbout,

    // Why Choose Us
    addFeature,
    updateFeature,
    deleteFeature,

    // Testimonials
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,

    // Blog
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addBlogComment,
    deleteBlogComment,
    addBlogReaction,
    removeBlogReaction,

    // Team / Governance
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,

    // Student Activities
    addStudentActivity,
    updateStudentActivity,
    deleteStudentActivity,

    // Messaging
    addMessage,
    markMessageAsRead,
    addMessageReply,
    deleteMessage,

    // Applications
    addApplication,
    updateApplicationStatus,
    deleteApplication,

    // Headers/Footer/Contact
    updateContact,
    updateHeader,
    updateFooter,
  };
}
