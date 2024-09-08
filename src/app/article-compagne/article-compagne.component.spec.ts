import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCompagneComponent } from './article-compagne.component';

describe('ArticleCompagneComponent', () => {
  let component: ArticleCompagneComponent;
  let fixture: ComponentFixture<ArticleCompagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCompagneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCompagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
