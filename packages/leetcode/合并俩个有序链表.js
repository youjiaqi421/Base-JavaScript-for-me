var mergeTwoLists = function(list1, list2) {
   let dummy = new ListNode(-1), 
   let p = dummy 
   let l1 = list1
   let l2 = list2

   while(l1 && l2) {
      if(l1.val < l2.val){
         p.next = l1 
         l1 = l1,next
      } else {
         p.next = l2 
         l2 = l2.next
      }
      p = p.next
   }

   p.next = l1 ? l1 : l2 
   return dummy.next
};