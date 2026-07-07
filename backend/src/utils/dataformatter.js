export const formatNote = (note) => ({
    id: note.id,
    userId: note.user_id,
    folderId: note.folder_id,
    title: note.title,
    content: note.content,
    isArchived: note.is_archived,
    createdAt: note.created_at,
    updatedAt: note.updated_at,
    deletedAt: note.deleted_at,
});