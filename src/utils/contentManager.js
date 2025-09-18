// 内容管理工具函数
// 提供便捷的内容操作方法

import { 
  personalInfo, 
  recentNews, 
  projects, 
  publications, 
  internships, 
  honors, 
  academicBlogs, 
  engineeringBlogs 
} from '../data/content.js';

export class ContentManager {
  // 获取所有内容
  static getAllContent() {
    return {
      personalInfo,
      recentNews,
      projects,
      publications,
      internships,
      honors,
      academicBlogs,
      engineeringBlogs
    };
  }

  // 添加新项目
  static addProject(project) {
    const newProject = {
      id: Date.now(),
      ...project,
      createdAt: new Date().toISOString()
    };
    projects.unshift(newProject);
    return newProject;
  }

  // 添加新论文
  static addPublication(publication) {
    const newPublication = {
      id: Date.now(),
      ...publication,
      createdAt: new Date().toISOString()
    };
    publications.unshift(newPublication);
    return newPublication;
  }

  // 添加新实习经历
  static addInternship(internship) {
    const newInternship = {
      id: Date.now(),
      ...internship,
      createdAt: new Date().toISOString()
    };
    internships.unshift(newInternship);
    return newInternship;
  }

  // 添加新荣誉奖项
  static addHonor(honor) {
    const newHonor = {
      id: Date.now(),
      ...honor,
      createdAt: new Date().toISOString()
    };
    honors.unshift(newHonor);
    return newHonor;
  }

  // 添加新博客
  static addBlog(blog, category = 'academic') {
    const newBlog = {
      id: Date.now(),
      date: new Date().toLocaleDateString('zh-CN'),
      ...blog,
      createdAt: new Date().toISOString()
    };
    
    if (category === 'academic') {
      academicBlogs.unshift(newBlog);
    } else {
      engineeringBlogs.unshift(newBlog);
    }
    return newBlog;
  }

  // 添加新动态
  static addNews(news) {
    const newNews = {
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' }),
      content: news,
      createdAt: new Date().toISOString()
    };
    recentNews.unshift(newNews);
    // 保持最新的5条动态
    if (recentNews.length > 5) {
      recentNews.pop();
    }
    return newNews;
  }

  // 更新个人信息
  static updatePersonalInfo(updates) {
    Object.assign(personalInfo, updates);
    return personalInfo;
  }

  // 删除内容
  static deleteContent(type, id) {
    let targetArray;
    switch (type) {
      case 'project':
        targetArray = projects;
        break;
      case 'publication':
        targetArray = publications;
        break;
      case 'internship':
        targetArray = internships;
        break;
      case 'honor':
        targetArray = honors;
        break;
      case 'academicBlog':
        targetArray = academicBlogs;
        break;
      case 'engineeringBlog':
        targetArray = engineeringBlogs;
        break;
      default:
        return false;
    }
    
    const index = targetArray.findIndex(item => item.id === id);
    if (index > -1) {
      targetArray.splice(index, 1);
      return true;
    }
    return false;
  }

  // 搜索内容
  static searchContent(query, type = 'all') {
    const results = [];
    const searchText = query.toLowerCase();
    
    if (type === 'all' || type === 'projects') {
      projects.forEach(project => {
        if (project.title.toLowerCase().includes(searchText) || 
            project.description.toLowerCase().includes(searchText) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchText))) {
          results.push({ type: 'project', data: project });
        }
      });
    }
    
    if (type === 'all' || type === 'publications') {
      publications.forEach(pub => {
        if (pub.title.toLowerCase().includes(searchText) || 
            pub.abstract.toLowerCase().includes(searchText)) {
          results.push({ type: 'publication' });
        }
      });
    }
    
    if (type === 'all' || type === 'blogs') {
      [...academicBlogs, ...engineeringBlogs].forEach(blog => {
        if (blog.title.toLowerCase().includes(searchText) || 
            blog.summary.toLowerCase().includes(searchText) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchText))) {
          results.push({ type: 'blog', data: blog });
        }
      });
    }
    
    return results;
  }
}

// 导出便捷的操作函数
export const {
  addProject,
  addPublication,
  addInternship,
  addHonor,
  addBlog,
  addNews,
  updatePersonalInfo,
  deleteContent,
  searchContent
} = ContentManager;
