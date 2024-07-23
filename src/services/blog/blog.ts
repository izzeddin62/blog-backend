export type BlogProperties = {
  id: number;
  title: string;
  owner: number;
  content: string;
};

export class Blog {
  id: number;
  title: string;
  owner: number;
  content: string;
  constructor(data: BlogProperties) {
    this.id = data.id;
    this.title = data.title;
    this.owner = data.owner;
    this.content = data.content;

  }

  getBlogProperties(): BlogProperties {
    return {
      id: this.id,
      title: this.title,
      owner: this.owner,
      content: this.content,
    }
  }
}
