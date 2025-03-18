//import { Component, Input, SimpleChanges, inject, signal, OnInit, OnChanges } from '@angular/core';
import {
  Component,
  Input,
  inject,
  signal,
  OnInit,
  OnChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLinkWithHref } from "@angular/router";
import { ProductComponent } from "@products/components/product/product.component";

import { Product } from "@shared/models/product.model";
import { CartService } from "@shared/services/cart.service";
import { ProductService } from "@shared/services/product.service";
import { CategoryService } from "@shared/services/category.service";
import { Category } from "@shared/models/category.model";

@Component({
  selector: "app-list",
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: "./list.component.html",
})
export default class ListComponent implements OnInit, OnChanges {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  //  ngOnChanges(changes: SimpleChanges) {
  ngOnChanges() {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      } /* ,
      error: () => {
        
      } */,
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      } /* ,
      error: () => {
        
      } */,
    });
  }
}
