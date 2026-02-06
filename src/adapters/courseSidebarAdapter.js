export const adaptCourseSidebarData = (schemaData) => {
    if (!Array.isArray(schemaData)) return [];

    return schemaData.map((section) => ({
        chapterId: section.section_id,
        chapterTitle: section.title,

        lessons: (section.lessons || []).map((lesson) => {
            // ✅ normalize article_content safely
            let articleContent = null;

            if (lesson.article_content) {
                if (typeof lesson.article_content === "string") {
                    articleContent = JSON.parse(lesson.article_content);
                } else {
                    articleContent = lesson.article_content;
                }
            }

            return {
                id: lesson.id,
                title: lesson.title,
                contentType: lesson.content_type,
                orderIndex: lesson.order_index,

                // VIDEO
                videoUrl: lesson.video_url || null,
                transcripts: articleContent?.transcripts || null,

                // ARTICLE
                textbook: articleContent?.textbook || null,

                // TEST
                quizData: lesson.quiz_data || null
            };
        })
    }));
};
